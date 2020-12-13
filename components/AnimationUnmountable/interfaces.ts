export interface AnimationUnmountableProps {
  isMounted: boolean;
  animation: string;
  duration?: number;
  unmountAnimation: string;
  unmountDuration?: number;
}