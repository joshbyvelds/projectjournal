Feature: Main Page - Project Grid

  @javascript @project_grid
  Scenario: Load the Project grid on page load
    Given I am logged in
    Then I should see "Behat Project Title" in the ".grid_item .name" element
    And I should see "00:00:00" in the ".grid_item .time_spent span" element
    And I should see a ".category_icon.category_9" element
    And ".grid_item .project_thumbnail" element should have an "style" attribute with 'background-image: url("images/updates/project_not_started.webp");' value

  @javascript @project_grid
  Scenario: Select a project on the project grid
    Given I am logged in
    Then I should see "Behat Project Title" in the ".grid_item .name" element
    When I click on the ".grid_item .name" element
    Then the ".grid_item" element should have the class "selected"

  @javascript @ssf @ssf_needed
  Scenario: Add one more Project for search and filter
    Given I am logged in
    And I click on the ".header_nav .add" element
    Then I wait for animations to finish
    When I fill in "add_project_title" with "Behat Search Project"
    And I select "Website" from "add_project_category"
    And I fill in "add_project_description" with "test project description here"
    And I press "submitNewProject"
    Then I wait for ladda animation to complete
    Then the "#add_project_php_error" element should not contain "\"*"
    Then I click on the ".overlay_panel.add .close_bottom" element
    Then I wait for animations to finish
    And I should see "Behat Search Project"
