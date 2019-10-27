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
