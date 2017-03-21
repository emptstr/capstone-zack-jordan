import {DesignDocBuilder} from "./db.design.doc.builder";
import {DesignDoc} from "./db.design.doc";
import {View} from "./db.view";

describe("Test Design Doc Builder", () => {

  let design_doc_id = "test"
  let view_function = () => {
    console.log("test")
  }
  let test_view: View = {
    view_name: "test",
    map_reduce_function: () => {
      console.log("test")
    }
  }
  let design_doc = {
    _id: "_design/test",
    views: {
      "test": () => {
        console.log("test")
      }
    }
  }
  let designDocBuilder: DesignDocBuilder = null

  beforeEach(() => {
    designDocBuilder = new DesignDocBuilder()
  })

  it("Test set id", () => {
    designDocBuilder.set_Id(design_doc_id)
    let designDoc: DesignDoc = designDocBuilder.build()
    expect(designDoc._id).toEqual("_design/".concat(design_doc_id))
  })

  it("Test add view", () => {
    designDocBuilder.add_view(test_view)
    let designDoc: DesignDoc = designDocBuilder.build();
    expect(designDoc.views["test"].toString()).toEqual(view_function.toString())
  })

  it("Test build", () => {
    designDocBuilder.set_Id(design_doc_id)
    designDocBuilder.add_view(test_view)
    expect(designDocBuilder.build()).toEqual(design_doc)
    expect(designDocBuilder.build()).toEqual({_id: "", views: {}})
  })
})