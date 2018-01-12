var app     = require("./server.js"),
	chai	= require("chai"),
	assert  = chai.assert,
	expect  = chai.expect,
	should  = chai.should(),
	app     = require("./server.js"),
	request = require("supertest");


describe("scribbleNote", function() {

	xit("should test if the post route returns data", function(done) {
		var data = {
			email: "segun@gmail.com",
			password: "segun"
		};

		request(app)
			.post("/api/v1/users")
			.send(data)
			.set("Content-Type", "Application/json")
			.expect(200)
			.end(function(err, res) {

				expect(res.body).to.be.an("object")
				expect(res.body.email).to.be.equal(data.email);
				done()
			})
	})

	it("should test if get route fetches users", function(done) {

		request(app)
			.get("/api/v1/users")
			.expect("Content-Type", "Application/json")
			.expect(200)
			.end(function(err, res) {

				expect(res.body).to.be.an("array")
				expect(res.body[0]).to.be.an("object")
				expect(res.body[0]).to.have.property("email")
				expect(res.body[0]).to.have.property("_id")
				done()
			})
	})
})