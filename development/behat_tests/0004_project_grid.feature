Feature: Main Page - Project Grid

  @javascript @project_grid
  Scenario: Look at project grid
    Given I am logged in
    And I should see "Behat Project Title" in the ".grid_item .name" element
    And I should see "00:00:00" in the ".grid_item .time_spent span" element
    And I should see a ".category_icon.category_1" element
    And ".grid_item .project_thumbnail" element should have an "style" attribute with 'background-image: url("images/updates/project_not_started.webp");' value



