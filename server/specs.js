var app     = require("./server.js"),
	chai	= require("chai"),
	assert  = chai.assert,
	expect  = chai.expect,
	should  = chai.should(),
	request = require("supertest");


describe("scribbleNote", function() {

	describe("#user registration", function() {

		it("should test if the post route returns data", function(done) {
			var data = {
				email: "bayo@gmail.com",
				password: "bayo"
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

		it("should delete users", function(done) {

			var data = {
				email: "bobo@gmail.com",
				password: "bobo"
			};

			request(app)
				.post("/api/v1/users")
				.send(data)
				.set("Content-Type", "Application/json")
				.expect(200)
				.end(function(err, res) {
					var id = res.body._id;

					request(app)
						.delete("/api/v1/users/"+id)
						.expect(200)
						.end(function(err, respond) {

							var _id = respond.body._id;

							expect(respond.body).to.be.an("object")
							expect(respond.body.email).to.be.equal(data.email)

							request(app)
								.get("api/v1/users/"+_id)
								.end(function(err, resp) {

									expect(resp).to.be.equal(null)
									done();
								})
						})
				})
		})

		it("should update users", function(done) {

			var data = {
				email: "queen@gmail.com",
				password: "queen"
			}

			request(app)
				.post("/api/v1/users")
				.send(data)
				.set("Content-Type", "Application/json")
				.expect(200)
				.end(function(err, res) {

					var id = res.body._id,
						details = {
							email: "bright@gmail.com"
						},
						expectedVal = 1;

					request(app)
						.put("/api/v1/users/" + id)
						.send(details)
						.set("Content-Type", "Application/json")
						.expect(200)
						.end(function(err, response) {
							
							expect(response.body).to.be.an("object")
							expect(response.body.n).to.be.equal(expectedVal)
							expect(response.body.nModified).to.equal(expectedVal)
							done()
						}) 
				})
		})

	})

})