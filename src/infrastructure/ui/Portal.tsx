import { FC, ReactNode, createContext, useContext, useEffect } from "react";

interface ElementForContext {
  name: string;
  component: ReactNode;
}

interface PortalProps {
  children: ReactNode;
  name: string;
}

export const PortalContext = createContext({
  addComponent: (element: ElementForContext) => {},
  removeComponent: (name: string) => {},
});

export const Portal: FC<PortalProps> = ({ children, name }) => {
  const { addComponent, removeComponent } = useContext(PortalContext);

  useEffect(() => {
    addComponent({ name, component: children });
    return () => {
      removeComponent(name);
    };
  }, [children, name]);

  return null;
};
