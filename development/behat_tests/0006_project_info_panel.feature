Feature: Main Page - Project Infomation

  @javascript @project_info
  Scenario: The Project Information panel should be empty when page loads
    Given I am logged in
    Then I should see "Please select a project"

  @javascript @project_info
  Scenario: The Project Information panel should show basic project info when project is selected
    Given I am logged in
    When I click on the '.grid_item[data-id="1"]' element
    And I wait 1 second
    Then I should see "Behat Project Title" in the ".info_panel .project_name" element
    And I should see "00:00:00" in the ".info_panel .time_spent" element
    And ".info_panel .thumbnail" element should have an "style" attribute with 'background-image: url("images/updates/project_not_started.webp"); background-size: cover;' value
    And I should see "test project description here" in the ".info_panel .project_description" element
