const test_mongodb = require("../test_helper/in_memory_mongodb_setup");

beforeAll(test_mongodb.setup);
afterAll(test_mongodb.teardown);

const Feedback = require("./feedback");

// Testing on "Feedback" model
describe("Feedback model", () => {
  const userName = "Gordon";
  const session = "Javascript";
  const feedbackPositive = "Lesson was good";
  const feedbackNegative = "Let's have more labs";

  let feedback = new Feedback({
    userName,
    session,
    feedbackPositive,
    feedbackNegative
  });
  // Test that feedback can be save on server
  it("can be saved", async () => {
    await expect(feedback.save()).resolves.toBe(feedback);
  });
  // Test that feedback can be search by id
  it("can be searched by _id", async () => {
    let searchResult = await Feedback.findById(feedback._id);
    expect(searchResult.userName).toEqual(userName);
    expect(searchResult.session).toEqual(session);
    expect(searchResult.feedbackPositive).toEqual(feedbackPositive);
    expect(searchResult.feedbackNegative).toEqual(feedbackNegative);
  });
  // Test that feedback can be search by username
  it("can be searched by userName", async () => {
    let searchResult = await Feedback.findOne({
      userName
    });
    expect(searchResult.userName).toEqual(userName);
  });
  // Test that feedback can be deleted from server
  it("can be deleted", async () => {
    await Feedback.remove();
    let searchResult = await Feedback.findById(feedback._id);
    expect(searchResult).toBeNull();
  });
});