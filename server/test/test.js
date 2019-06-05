/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : test.js
 * @author      : shruti
 * @version     : 1.0
 ******************************************************************************************/

var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should()
var server = require('../server');
var fs = require('fs')
function readFile() {
    var obj = fs.readFileSync('/home/user/chatApp/server/test/testData.json')
    var data = JSON.parse(obj);
    return data;
}

describe('Test cases', () => {
    /**
     * @description    : test Script for Registration
     */
    describe('Test case for Registration Page', () => {
        var data = readFile();
        // console.log(data.registration)
        it('status', (done) => {
            chai.request(server).post('/register').send(data.registration).end((err, res) => {
                if (err) {
                    console.log("error in registration", err)
                    err.should.have.status(400);
                }
                else {
                    console.log('result in registration ', res.body)
                    res.should.have.status(200);
                }



                /**
                  * @description    : test Script for Login Page
                */
                describe('Test case for Login page', () => {

                    it("login successfuly or not", (done) => {
                        chai.request(server).post("/login").send(data.login).end((err, res) => {
                            if (err) {
                                console.log('error in email verification', err)
                                err.should.have.status(400)
                            }
                            else {
                                console.log('result of login ', res.body);
                                res.should.have.status(200);
                            }

                            /**
                            * @description    : test Script for verifying user
                             */
                            describe(" Test case for Verify User for forget Password", () => {
                                it("forget password", (done) => {
                                    chai.request(server).post('/forget').send(data.forgotPassword).end((err, res) => {
                                        if (err) {
                                            console.log("error in forget password", err)
                                            err.should.have.status(400)
                                        }
                                        else {
                                            console.log("result of forget password", res.body)
                                            res.should.have.status(200)
                                        }

                                        /**
                                       * @description    : test Script for verifying user
                                        */
                                        describe("Test case for Reset Password", () => {
                                            it("Reseting Password", (done) => {
                                                chai.request(server).post('/reset/:token').send(data.resetPassword).end((err, res) => {
                                                    if (err) {
                                                        console.log("error in email verification", err);
                                                        err.should.have.status(400)
                                                    }
                                                    else {
                                                        console.log("result of reset password", res.body);
                                                        res.should.have.status(200);
                                                    }

                                                    done();
                                                })
                                            })
                                        })
                                        done();
                                    })
                                })
                            })
                            done();
                        })
                    })
                })
                done();
            })
        })
    })

})