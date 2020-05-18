const NAMESPACE_SEPARATOR = '/';

export class NamespaceInfo {
  public static global(): NamespaceInfo {
    return new NamespaceInfo([]);
  }

  public static topLevel(namespaceName: string): NamespaceInfo {
    return new NamespaceInfo([namespaceName]);
  }

  private readonly _segments: string[];
  private _name: string | null;
  private _path: string | null;

  public constructor(segments: string[]) {
    this._segments = segments;
    this._name = null;
    this._path = null;
  }

  public get segments(): string[] {
    return Array.from(this._segments);
  }

  public get name(): string {
    if (this._name === null) {
      this._name = this._segments.length > 0
        ? this._segments[this._segments.length - 1]
        : '';
    }
    return this._name;
  }

  public get path(): string {
    if (this._path === null) {
      this._path = this.join(this._segments);
    }
    return this._path;
  }

  public append(segment: string): NamespaceInfo {
    return new NamespaceInfo(this._segments.concat(segment));
  }

  public appendAndGetPath(segment: string): string {
    return this.join(this._segments.concat(segment));
  }

  private join(segments: string[]): string {
    return segments.join(NAMESPACE_SEPARATOR);
  }

  public toString() {
    return this.path;
  }
}
