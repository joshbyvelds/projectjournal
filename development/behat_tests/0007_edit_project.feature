Feature: Main Page - Edit Project Overlay Panel

  @javascript @edit_project
  Scenario: Open Edit Project Modal
    Given I am logged in
    And I wait 1 second
    When I click on the '.grid_item[data-id="1"]' element
    And I wait 1 second
    Then I click on the "#project_info_edit_button" element
    And I wait for animations to finish
    Then I should see "Edit Project" in the ".overlay_panel.edit_project h2" element

  @javascript @edit_project
  Scenario: Test Edit Project Empty Project Fields Errors
    Given I am logged in
    And I wait 1 second
    When I click on the '.grid_item[data-id="1"]' element
    And I wait 1 second
    And I click on the "#project_info_edit_button" element
    And I wait for animations to finish
    Then I fill in "edit_project_title" with ""
    And I fill in "edit_project_description" with ""
    Then I click on the "#editProjectSubmit" element
    And I wait 1 second
    And I wait for animations to finish
    Then I should see "Please fill in a new title for the project"
    Then I should see "Please fill in a new description for the project"

  @javascript @edit_project
  Scenario: Edit Project with new title,category and description
    Given I am logged in
    And I wait 1 second
    When I click on the '.grid_item[data-id="1"]' element
    And I wait 1 second
    And I click on the "#project_info_edit_button" element
    And I wait for animations to finish
    Then I fill in "edit_project_title" with "Behat Edit Project"
    And I fill in "edit_project_description" with "Test edit project description here"
    Then I click on the "#editProjectSubmit" element
    And I wait for ladda animation to complete
    Then I should not see "Please fill in a new title for the project"
    Then I should not see "Please fill in a new description for the project"

    # Close the panel..
    When I click on the ".overlay_panel.edit_project .close_x" element
    And I wait for animations to finish

    # Check to see that our data has changed on the elements..
    Then I should see "Behat Edit Project" in the ".grid_item[data-id='1'] .name" element
    When I click on the '.grid_item[data-id="1"]' element
    And I wait 1 second
    Then I should see "Behat Edit Project" in the ".info_panel .project_name" element
    And I should see "Test edit project description here" in the ".info_panel .project_description" element

    # Refresh the page and check again..
    Given I am logged in
    And I wait 1 second
    Then I should see "Behat Edit Project" in the ".grid_item[data-id='1'] .name" element
    When I click on the '.grid_item[data-id="1"]' element
    And I wait 1 second
    Then I should see "Behat Edit Project" in the ".info_panel .project_name" element
    And I should see "Test edit project description here" in the ".info_panel .project_description" element





