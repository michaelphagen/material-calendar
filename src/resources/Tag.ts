import Category from "./Category";

interface Tag {
  [k: string]: unknown;
  id: string;
  title: string;
  category: Category;
}

class Tag implements Tag {
  static url = "/api/tag";
  constructor(tag = { id: "", name: "", category: new Category() }) {
    Object.assign(this, tag);
  }
}

export default Tag;
