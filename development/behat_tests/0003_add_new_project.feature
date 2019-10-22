Feature: Main Page - Add New Project

  @javascript
  Scenario: Open New Project Modal
    Given I am logged in
    And I click on the ".header_nav .add" element
    Then I wait for animations to finish
    Then I should see "Create New Project"

  @javascript
  Scenario: Close New Project Modal X Button
    Given I am logged in
    And I click on the ".header_nav .add" element
    Then I wait for animations to finish
    When I click on the ".overlay_panel.add .close_x" element
    And I wait for animations to finish
    Then I should not see "Create New Project"

  @javascript
  Scenario: Close New Project Modal Bottom Button
    Given I am logged in
    And I click on the ".header_nav .add" element
    Then I wait for animations to finish
    When I click on the ".overlay_panel.add .close_bottom" element
    And I wait for animations to finish
    Then I should not see "Create New Project"

  @javascript
  Scenario: Check form for errors
    Given I am logged in
    And I click on the ".header_nav .add" element
    Then I wait for animations to finish
    And I press "submitNewProject"
    Then I wait for animations to finish
    Then I wait 1 second
    Then I should see "Please create a title for this new project"
    And I should see "Please select a category for this new project"
    And I should see "Please write a description for this new project"

  @javascript
  Scenario: Add New Project to DB
    Given I am logged in
    And I click on the ".header_nav .add" element
    Then I wait for animations to finish
    When I fill in "add_project_title" with "Behat Project Title"
    And I select "Web Apps" from "add_project_category"
    And I fill in "add_project_description" with "test project description here"
    And I press "submitNewProject"
    Then I wait for ladda animation to complete
    Then the "#add_project_php_error" element should not contain "\"*"
    Then I click on the ".overlay_panel.add .close_bottom" element
    Then I wait for animations to finish
    Then I should see "Behat Project Title" in the ".grid_item .name" element
    Then I should see "00:00:00" in the ".grid_item .time_spent span" element




