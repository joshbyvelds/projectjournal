Feature: Main Page - Delete Project Overlay Panel

  @javascript @delete_project
  Scenario: Delete project we just created
    Given I am logged in
    And I wait 1 second
    When I click on the '.grid_item[data-id="1"]' element
    And I wait 1 second
    Then I should see an "#project_info_delete_button" element

    # Open project delete modal
    When I click on the "#project_info_delete_button" element
    And I wait for animations to finish
    Then I should see "Are you sure you want to delete Project \"Behat Project Title\"?" in the ".overlay_panel.delete_check h2" element

    # Click the delete button..
    When I click on the "#delete_check_yes" element
    And I wait for ladda animation to complete
    Then I should see "The Project has been successfully deleted"

    # Close panel check that project element has been deleted
    When I click on the ".overlay_panel.delete_check .close_x" element
    And I wait for animations to finish
    Then I should not see "Behat Project Title"

    # Refresh and check again
    Given I am logged in
    And I wait 1 second
    Then I should not see "Behat Project Title"

  @javascript @delete_project @needed
  Scenario: Add Deleted Project back for more tests..
    Given I am logged in
    And I click on the ".header_nav .add" element
    Then I wait for animations to finish
    When I fill in "add_project_title" with "Behat Project Title"
    And I select "Web App" from "add_project_category"
    And I fill in "add_project_description" with "test project description here"
    And I press "submitNewProject"
    Then I wait for ladda animation to complete
    Then the "#add_project_php_error" element should not contain "\"*"
    Then I click on the ".overlay_panel.add .close_bottom" element
    Then I wait for animations to finish
    And I should see "Behat Project Title" in the ".grid_item .name" element
    And I should see "00:00:00" in the ".grid_item .time_spent span" element
    And I should see a ".grid_item .project_thumbnail" element
    Then ".grid_item .project_thumbnail" element should have an "style" attribute with 'background-image: url("images/updates/project_not_started.webp");' value
    And I should see a ".category_icon.category_9" element







