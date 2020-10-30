import { AtomsExtensions } from "./initHooksProto"

export function assertHasAtomsExtensions(
  value: Partial<AtomsExtensions>
): asserts value is AtomsExtensions {
  if (process.env.NODE_ENV !== "production") {
    if(value.$AtomsExtensions_atoms == null) {
      throw new TypeError("initHooksProto(Store) must be called")
    }
  }
}
