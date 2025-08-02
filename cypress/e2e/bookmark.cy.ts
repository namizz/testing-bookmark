// cypress/e2e/bookmark.split.spec.js
describe("Basic Bookmark Functionality Tests (granular)", () => {
  beforeEach(() => {
    cy.login(); // stubbed session
  });

  it("should get a valid session", () => {
    cy.intercept("GET", "/api/auth/session").as("getSession");
    cy.visit("/");
    cy.wait("@getSession").its("response.statusCode").should("eq", 200);
  });

  it("should load job cards on home page", () => {
    cy.intercept("GET", "/opportunities/search").as("getJobs");
    cy.visit("/");
    cy.wait("@getJobs");
    cy.get('[data-cy="job-card"]', { timeout: 60000 })
      .should("exist")
      .and("have.length.greaterThan", 0);
  });

  it("should bookmark the first job", () => {
    cy.visit("/");
    cy.get('[data-cy="job-card"]', { timeout: 60000 })
      .first()
      .as("firstJob")
      .within(() => {
        cy.get('[data-cy="bookmark-toggle"]').click();
        // verify UI reflects bookmarking
        cy.root().should("have.attr", "data-bookmarked", "true");
      });
  });

  it("should show the bookmarked job in bookmarks page", () => {
    // after bookmarking, navigate
    cy.visit("/");
    cy.get('[data-cy="job-card"]')
      .first()
      .within(() => {
        cy.get('[data-cy="bookmark-toggle"]').click();
      });

    cy.get('[data-cy="nav-bookmarks"]').click();
    cy.url().should("include", "/bookmark");
    cy.get('[data-cy="bookmarked-jobs-list"] [data-cy="job-card"]', {
      timeout: 60000,
    }).should("exist");
  });

  it("should remove a bookmark and no longer list it", () => {
    // assume there is at least one bookmarked job
    cy.visit("/bookmark");
    cy.get('[data-cy="bookmarked-jobs-list"] [data-cy="job-card"]', {
      timeout: 60000,
    })
      .first()
      .within(() => {
        cy.get('[data-cy="bookmark-toggle"]').click();
      });

    cy.wait(500);
    cy.reload();

    cy.get('[data-cy="bookmarked-jobs-list"] [data-cy="job-card"]').should(
      "not.exist"
    );
  });
});
