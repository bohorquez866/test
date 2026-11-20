import {
  startTransition,
  type ComponentProps,
  type ExoticComponent,
  type ReactNode,
} from "react";
import * as React from "react";

/** Props mirror React's experimental ViewTransition (enabled via next.config). */
type ViewTransitionProps = {
  children?: ReactNode;
  name?: string;
  default?: string | Record<string, string>;
  enter?: string | Record<string, string>;
  exit?: string | Record<string, string>;
  share?: string | Record<string, string>;
  update?: string | Record<string, string>;
};

type ReactWithViewTransitions = typeof React & {
  unstable_ViewTransition: ExoticComponent<ViewTransitionProps>;
  unstable_addTransitionType: (type: string) => void;
};

const reactVt = React as ReactWithViewTransitions;

export const ViewTransition = reactVt.unstable_ViewTransition;
export const addTransitionType = reactVt.unstable_addTransitionType;
export { startTransition };
export type { ViewTransitionProps, ComponentProps };
