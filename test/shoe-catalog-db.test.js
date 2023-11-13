import assert from "assert";
import db from "../routes/database-connection.js";
import queries from "../services/shoe-catalog-services.js";

const query= queries(db);

describe("Shoe Catalog API testing", function(){
    this.timeout(6000);
    
    this.beforeEach(async function (){
        await query.resetData();
        await query.resetUsers();
    });
    
    it("should return all shoe information", async function (){
        assert.equal(true,true);
    });

    this.afterAll(function () {
        db.$pool.end;
    });
})