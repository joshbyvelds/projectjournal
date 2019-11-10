Feature: Main Page - View journal entry

  @javascript @journal_entry @view_journal_entry
  Scenario: Open Image Journal Entry
    Given I am logged in
    And I wait 1 second
    When I click on the '.grid_item[data-id="2"]' element
    And I wait 1 second
    Then I click on the "#updates_open_close" element
    And I wait 1 second
    Then I should see an "img.image" element
  
    # Open Journal Entry Overlay
    When I click on the "img.image" element
    And I wait for animations to finish
    And I wait 1 second
    Then I should see "Behat Image Journal Entry Test Title" in the ".overlay_panel.journal_update h2" element
    And I should see "Behat image journal entry description" in the ".overlay_panel.journal_update p" element






