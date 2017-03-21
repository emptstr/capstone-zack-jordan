import {DesignDoc} from "./db.design.doc";
import {View} from "./db.view";

export class DesignDocBuilder {

  private static readonly DESIGN_DOC_ID_PREFIX: string = "_design/"
  private designDoc: DesignDoc = null

  constructor() {
    this.designDoc = {
      _id: "",
      views: {}
    }
  }

  public set_Id(_id: string) {
    let design_doc_id = DesignDocBuilder.DESIGN_DOC_ID_PREFIX.concat(_id)
    this.designDoc._id = design_doc_id
  }

  public add_view(view: View) {
    this.designDoc.views[view.view_name] = view.map_reduce_function;
  }

  public build(): DesignDoc {
    let designDoc: DesignDoc = this.designDoc;
    this.designDoc = {
      _id: "",
      views: {}
    };
    return designDoc;
  }

}