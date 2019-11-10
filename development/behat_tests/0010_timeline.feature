Feature: Main Page - View journal entry

  @javascript @timeline
  Scenario: Open Timeline Overlay
    Given I am logged in
    And I wait 1 second
    When I click on the '.header_nav .menu_item.timeline' element
    And I wait for animations to finish
    Then I should see "Project Activity Timeline" in the ".overlay_panel.timeline h2" element







