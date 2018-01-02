var app     = require("./server.js"),
	request = require("supertest");


describe("scribbleNote", function() {

	it("should expect 200", function() {
		request(app)
			.get("/api/v1/users")
			.expect(200)
	})
})