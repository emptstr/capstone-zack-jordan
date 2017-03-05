var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
export var DatabaseService = (function () {
    function DatabaseService() {
    }
    /**
     * setDB
     * setter for the database, used primarly for testing
     * @param _db
     */
    DatabaseService.prototype.setDB = function (_db) {
        this._db = _db;
    };
    /**
     * fetch
     * fetches the document described by the provided id from the databse
     * @param _id
     */
    DatabaseService.prototype.fetch = function (_id) {
        return this._db.get(_id).then(function (result) {
            return result;
        }).catch(function (error) {
            throw error;
        });
    };
    /**
     * fetch
     * fetches all records from the database
     */
    DatabaseService.prototype.fetchAll = function () {
        return this._db.allDocs({ include_docs: true }).then(function (result) {
            return result;
        }).catch(function (error) {
            throw error;
        });
    };
    /**
     * query
     * queries a existing view descirbed by the viewname with the provided options
     * @param view_name
     * @param options
     */
    DatabaseService.prototype.query = function (view_name, options) {
        return this._db.query(view_name, options).then(function (result) {
            return result;
        }).catch(function (error) {
            throw error;
        });
    };
    /**
     * index
     * inserts the provided design document into the databse if it doesnt already exist.
     * performs a dry run query to bootstrap the views provided by the design doc
     * @param design_doc
     */
    DatabaseService.prototype.index = function (design_doc) {
        var _this = this;
        var id = design_doc._id;
        return this._db.get(id).then(function (result) {
            return result;
        }).catch(function (error) {
            if (error.status == "404") {
                _this._db.put(design_doc);
            }
            else {
                throw error;
            }
        });
    };
    DatabaseService.prototype.bootstrap = function (view_name) {
    };
    /**
     * put
     * inserts an nonexisting document into the databse or updates the existing database.
     * @param document
     * @param _id
     */
    DatabaseService.prototype.put = function (document, _id) {
    };
    DatabaseService.VIEW_NAME_DELIMITTER = "/";
    DatabaseService.VIEW_NAME_QUERY_PREFIX = "_design/";
    DatabaseService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], DatabaseService);
    return DatabaseService;
}());
//# sourceMappingURL=db.service.js.map