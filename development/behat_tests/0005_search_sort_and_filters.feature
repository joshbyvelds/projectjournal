Feature: Main Page - Project Grid Search, Sort & Filters (ssf)

  @javascript @ssf @search
  Scenario: Search the project grid for a project with title
    Given I am logged in
    When I fill in "search" with "search"
    And I wait 1 second
    Then I should not see "Behat Project Title"
    And the ".grid_item" element should have the class "selected"

  @javascript @ssf @filter
  Scenario: Filter projects with Web App category
    Given I am logged in
    When I select "Web App" from "filterCategory"
    And I wait 1 second
    Then I should see "Behat Project Title"
    And I should not see "Behat Search Project"

  @javascript @ssf @filter
  Scenario: Filter projects in Idea stage
    Given I am logged in
    When I select "Idea" from "filterStage"

  @javascript @ssf @filter
  Scenario: Filter projects in Work in Progress stage
    Given I am logged in
    When I select "Work in Progress" from "filterStage"

  @javascript @ssf @filter
  Scenario: Filter projects in Complete stage
    Given I am logged in
    When I select "Complete" from "filterStage"

  @javascript @ssf @sort
  Scenario: Sort By Last Updated
    Given I am logged in

  @javascript @ssf @sort
  Scenario: Sort By Name
    Given I am logged in

  @javascript @ssf @sort
  Scenario: Sort By Category
    Given I am logged in

  @javascript @ssf @sort
  Scenario: Sort By Completed
    Given I am logged in
