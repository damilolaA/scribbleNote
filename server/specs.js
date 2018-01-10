var app     = require("./server.js"),
	chai	= require("chai"),
	assert  = chai.assert,
	expect  = chai.expect,
	should  = chai.should(),
	app     = require("./server.js"),
	request = require("supertest");


describe("scribbleNote", function() {

	it("should test if the post route returns data", function(done) {
		var data = {
			email: "shola@gmail.com",
			password: "shola"
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
})