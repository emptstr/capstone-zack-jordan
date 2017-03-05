import * as PouchDB from "../../../node_modules/pouchdb";
import { DatabaseService } from "./db.service";
describe("Database Service Test Suite", function () {
    var doc = { "test": "name", _id: 123 };
    var error = new Error("test");
    error.status = "404";
    var test_db = null;
    var _db_service = null;
    beforeEach(function () {
        test_db = new PouchDB("test");
        _db_service = new DatabaseService();
        _db_service.setDB(test_db);
    });
    describe("Fetch Test Suite", function () {
        var promise = null;
        var error = new Error("test");
        error.status = "404";
        var doc = { "test": "name", _id: 123 };
        it("Should Succesfully Fetch All", function () {
            promise = new Promise(function (resolve, reject) {
                resolve(doc);
            });
            spyOn(test_db, "allDocs").and.returnValue(promise);
            _db_service.fetchAll().then(function (value) {
                expect(test_db.allDocs).toHaveBeenCalledWith({ include_docs: true });
                expect(value).toEqual(doc);
            });
        });
        it("Should Succesfull Fetch a Document Based on it's id", function () {
            promise = new Promise(function (resolve, reject) {
                resolve(doc);
            });
            spyOn(test_db, "get").and.returnValue(promise);
            _db_service.fetch(doc._id).then(function (value) {
                expect(test_db.get()).toHaveBeenCalledWith(doc._id);
                expect(value).toEqual(doc);
            });
        });
    }); // end fetch test suite
    describe("Query Test Suite", function () {
        var promise = null;
        var design_doc = {
            _id: "test",
            views: {
                "test": function () {
                }
            }
        };
        var view_name = "_design/test";
        var options = {
            test: "test"
        };
        it("Should succesfully query an existing view", function () {
            promise = new Promise(function (resolve) {
                return doc;
            });
            spyOn(test_db, "query").and.returnValue(promise);
            _db_service.query(view_name, options).then(function (value) {
                expect(test_db.query()).toHaveBeenCalledWith(view_name, options);
                expect(value).toEqual(doc);
            });
        });
        it("Should succesfully index an existing Design_Document", function () {
            promise = new Promise(function (resolve) {
                resolve();
            });
            spyOn(test_db, "get").and.returnValue(design_doc);
            spyOn(test_db, "query").and.returnValue(promise);
            _db_service.index(design_doc).then(function (result) {
                expect(test_db.get()).toHaveBeenCalledWith(design_doc._id);
                expect(test_db.query()).toHaveBeenCalledWith(view_name);
            });
        });
        it("Should succesfully index a new Design_Document", function () {
            promise = new Promise(function (resolve) {
                resolve();
            });
            spyOn(test_db, "get").and.throwError(error);
            spyOn(test_db, "put").and.callFake(function () {
            });
            spyOn(test_db, "query").and.returnValue(promise);
            _db_service.index(design_doc).then(function (result) {
                expect(test_db.get()).toHaveBeenCalledWith(design_doc._id);
                expect(test_db.put()).toHaveBeenCalledWith(design_doc);
                expect(test_db.query()).toHaveBeenCalledWith(view_name);
            });
        });
    }); // end query test suite
});
//# sourceMappingURL=db.service.test.spec.js.map