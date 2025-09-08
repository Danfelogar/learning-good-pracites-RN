// reactiveSearchService.ts (corregido)
import { BehaviorSubject, Observable, Subject, of, from } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
  tap,
  catchError,
  filter,
} from "rxjs/operators";
import { CharacterGraphQLAdapter } from "../../adapters/characterGraphQLAdapter";

export class ReactiveSearchService {
  private searchSubject = new BehaviorSubject<string>("");
  private cancelPreviousRequests = new Subject<void>();
  private activeSearchTerm: string = "";
  private characterAdapter: CharacterGraphQLAdapter;

  constructor() {
    this.characterAdapter = CharacterGraphQLAdapter.getInstance();
  }

  setSearchTerm(term: string): void {
    console.log(`🔍 Nuevo término de búsqueda emitido: "${term}"`);
    this.searchSubject.next(term);
  }

  createSearchObservable(): Observable<any> {
    return this.searchSubject.pipe(
      tap((term) => {
        this.activeSearchTerm = term;
        console.log(`📥 Processing term: "${term}"`);
      }),
      debounceTime(300),
      distinctUntilChanged(),
      filter((term) => term.length >= 0), // Allow empty terms
      tap((term) => {
        if (term.length >= 2) {
          console.log(`⚡ Starting search for: "${term}"`);
        } else if (term.length === 0) {
          console.log(`🧹 Empty search, fetching all characters`);
        } else if (term.length === 1) {
          console.log(`⏳ Waiting for more characters...`);
          // Cancel any request if there is only 1 character
          this.characterAdapter.cancelPendingRequests();
        }
      }),
      switchMap((term) => {
        // Cancel previous requests
        this.cancelPreviousRequests.next();
        console.log(`🚫 Canceling previous requests`);
        // this.characterAdapter.cancelPendingRequests();

        // If the term is empty, make a request with empty name to get all
        if (term.length === 0) {
          console.log(`🌐 Fetching all characters (empty search)`);
          return from(this.characterAdapter.getCharacters({ name: "" })).pipe(
            takeUntil(this.cancelPreviousRequests),
            tap((result) => {
              console.log(
                `✅ All characters fetched: ${result.resultsFront.length} characters`
              );
            }),
            catchError((error) => {
              if (error.message === "SearchCancelled") {
                console.log(`🟡 Fetch all cancelled`);
                return of(null);
              }
              console.error(`❌ Error fetching all characters:`, error);
              throw error;
            })
          );
        }

        // If it has 1 character, do not make a request yet (wait for more input)
        if (term.length === 1) {
          console.log(`⏸️  Skipping request for single character: "${term}"`);
          return of(null);
        }

        // For 2+ characters, perform the normal search
        return from(this.characterAdapter.getCharacters({ name: term })).pipe(
          takeUntil(this.cancelPreviousRequests),
          tap((result) => {
            console.log(
              `✅ Search completed for: "${term}" - Results: ${result.resultsFront.length} characters`
            );
          }),
          catchError((error) => {
            if (error.message === "SearchCancelled") {
              console.log(`🟡 Búsqueda cancelada para: "${term}"`);
              return of(null);
            }
            console.error(`❌ Error searching for: "${term}"`, error);
            throw error;
          })
        );
      })
    );
  }

  cancelAllSearches(): void {
    console.log(`🛑 Canceling all active searches`);
    this.cancelPreviousRequests.next();
    this.characterAdapter.cancelPendingRequests();
    this.searchSubject.next("");
  }

  getActiveSearchTerm(): string {
    return this.activeSearchTerm;
  }

  destroy(): void {
    console.log(`♻️ Cleaning up search resources`);
    this.cancelPreviousRequests.next();
    this.characterAdapter.cancelPendingRequests();
    this.cancelPreviousRequests.complete();
    this.searchSubject.complete();
  }
}
