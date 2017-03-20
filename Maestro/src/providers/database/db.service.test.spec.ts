import * as PouchDB from "../../../node_modules/pouchdb";
import {DatabaseService} from "./db.service";
import {DesignDoc} from "./db.design.doc";

describe("Database Service Test Suite", () => {

  let doc = {"test": "name", _id: 123}
  let error: any = new Error("test");
  error.status = "404";
  let promise = null;
  let test_db = null;
  let _db_service = null;

  beforeEach(() => {
    test_db = new PouchDB("test");
    _db_service = new DatabaseService();
    _db_service.setDB(test_db);
  })

  describe("Fetch Test Suite", () => {
    it("Should Succesfully Fetch All", () => {
      promise = new Promise((resolve, reject) => {
        resolve(doc);
      });
      spyOn(test_db, "allDocs").and.returnValue(promise);
      _db_service.fetchAll().then((value) => {
        expect(test_db.allDocs).toHaveBeenCalledWith({include_docs: true});
        expect(value).toEqual(doc);
      });

    });

    it("Should Succesfull Fetch a Document Based on it's id", () => {
      promise = new Promise((resolve, reject) => {
        resolve(doc);
      });
      spyOn(test_db, "get").and.returnValue(promise);
      _db_service.fetch(doc._id).then((value) => {
        expect(test_db.get()).toHaveBeenCalledWith(doc._id);
        expect(value).toEqual(doc)
      });
    });


  });// end fetch test suite

  describe("Query Test Suite", () => {

    let design_doc: DesignDoc = {
      _id: "test",
      views: {
        "test": () => {
        }
      }
    };
    let view_name = "_design/test";
    let options = {
      test: "test"
    }


    it("Should succesfully query an existing view", () => {
      promise = new Promise((resolve) => {
        return doc;
      });
      spyOn(test_db, "query").and.returnValue(promise);
      _db_service.query(view_name, options).then((value) => {
        expect(test_db.query()).toHaveBeenCalledWith(view_name, options);
        expect(value).toEqual(doc);
      });
    })

    it("Should succesfully index an existing Design_Document", () => {
      promise = new Promise((resolve, reject) => {
        resolve();
      })
      spyOn(test_db, "get").and.returnValue(design_doc);
      spyOn(test_db, "query").and.returnValue(promise);
      _db_service.index(design_doc).then((result) => {
        expect(test_db.get()).toHaveBeenCalledWith(design_doc._id);
        expect(test_db.query()).toHaveBeenCalledWith(view_name);
      });
    })

    it("Should succesfully index a new Design_Document", () => {
      promise = new Promise((resolve, reject) => {
        reject();
      })
      spyOn(test_db, "get").and.returnValue(promise);
      spyOn(test_db, "put").and.returnValue(promise)
      spyOn(test_db, "query").and.returnValue(promise);
      _db_service.index(design_doc).then((result) => {
        expect(test_db.get()).toHaveBeenCalledWith(design_doc._id);
        expect(test_db.put()).toHaveBeenCalledWith(design_doc);
        expect(test_db.query()).toHaveBeenCalledWith(view_name, {limit: 0});
      });
    })
  });// end query test suite

  describe("Put test suite", () => {
    it("Successfully inserts a new document into the database", () => {
      promise = new Promise((resolve, reject) => {
        reject(error);
      });
      spyOn(test_db, "get").and.returnValue(promise);
      spyOn(test_db, "put").and.callFake(() => {
      });
      _db_service.put(doc).then((result) => {
        expect(test_db.get()).toHaveBeenCalledWith(doc._id);
        expect(test_db.put()).toHaveBeenCalledWith(doc);
      });
    })
  })
  it("Succesfully updates an existing document", () => {
    promise = new Promise((resolve, reject) => {
      resolve(doc);
    });
    spyOn(test_db, "get").and.returnValue(promise);
    spyOn(test_db, "put").and.returnValue(promise);
    _db_service.put(doc).then((result) => {
      expect(test_db.get()).toHaveBeenCalledWith(doc._id);
      expect(test_db.put()).toHaveBeenCalledWith(doc);
    })
  })
})