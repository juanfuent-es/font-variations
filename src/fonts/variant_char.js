import Char from "./char";
export default class VariantChar extends Char {
    constructor(args = {}) {
        super(args)
        this.wght = args.wght || 900 // Weight
        this.wdth = args.wdth || 175 // Width
    }
}