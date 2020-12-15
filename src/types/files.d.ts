declare module '*.woff'
declare module '*.woff2'
declare module '*.svg' {
  const ReactComponent: React.ComponentType<React.SVGProps<T>>
  export default ReactComponent
}
declare module '*.png'
