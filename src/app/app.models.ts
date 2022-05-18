export class Category {
  constructor(public id: number,
    public name: string,
    public hasSubCategory: boolean,
    public parentId: number) { }
}

export class Product {
  constructor(public id: number,
    public name: string,
    public images: Array<any>,
    public oldPrice: number,
    public newPrice: number,
    public discount: number,
    public ratingsCount: number,
    public ratingsValue: number,
    public description: string,
    public availibilityCount: number,
    public cartCount: number,
    public color: Array<string>,
    public size: Array<string>,
    public weight: number,
    public categoryId: number) { }
}
export class adminCategory {
  constructor(
    public id: string,
    public name: string
  ) { }
}
export class adminMaterial {
  constructor(
    public id: string,
    public name: string
  ) { }
}
  export class adminProduct {
    constructor(
      public id: string,
      public type_name: string
    ) { }
}
export class adminColor {
  constructor(
    public id: string,
    public color_name: string,
    public color_code: string
  ) { }
}
export class adminSubcat {
  constructor(
    public id: string,
    public cat_name: string,
    public cat_id: string,
    public name:string
  ) { }
}