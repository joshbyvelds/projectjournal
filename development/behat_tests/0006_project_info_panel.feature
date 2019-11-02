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

  @javascript @project_info @project_timer
  Scenario: The project timer should increase when I click the start button in the Project info panel and stop when I click stop
    Given I am logged in
    When I click on the '.grid_item[data-id="1"]' element
    And I wait 1 second
    Then I click on the '#project_timer_start_button' element
    And I wait 1 second
    Then I should see a "#project_timer_stop_button" element
    And the "#project_timer_start_button" element should not be visible
    And I wait 4 seconds
    When I click on the '#project_timer_stop_button' element
    And I wait 1 second
    Then I should see "00:00:05" in the ".grid_item[data-id='1'] .time_spent" element
    Then I should see "00:00:05" in the ".info_panel .time_spent" element
    And I should see a "#project_timer_start_button" element
    And the "#project_timer_stop_button" element should not be visible

    Given I am logged in
    When I click on the '.grid_item[data-id="1"]' element
    And I wait 1 second
    Then I should see "00:00:05" in the ".grid_item[data-id='1'] .time_spent" element
    Then I should see "00:00:05" in the ".info_panel .time_spent" element



