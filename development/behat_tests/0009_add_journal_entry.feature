Feature: Main Page - Add Journal Entry

  @javascript @journal_entry
  Scenario: Test Journal Update form errors
    Given I am logged in
    And I wait 1 second
    When I click on the '.grid_item[data-id="2"]' element
    And I wait 1 second
    Then I click on the "#project_info_add_entry_button" element
    And I wait for animations to finish
    Then I should see "Write Project Update" in the ".overlay_panel.add_update h2" element

    # No Type Selected
    When I fill in "update_title" with ""
    And I fill in "update_description" with ""
    Then I click on the "#updateSubmit" element
    And I wait for ladda animation to complete
    And I wait for animations to finish
    Then I should see "Please select a Update Type"

    # Image Type Selected
    When I click on the ".radio[value='image']" element
    And I fill in "update_title" with ""
    And I fill in "update_description" with ""
    Then I click on the "#updateSubmit" element
    And I wait for ladda animation to complete
    And I wait for animations to finish
    Then I should see "Please select a file to upload"
    And I should see "Please enter a title for the journal update"
    And I should see "Please enter a description for the journal update"

    # Audio Type Selected
    When I click on the ".radio[value='audio']" element
    And I fill in "update_title" with ""
    And I fill in "update_description" with ""
    Then I click on the "#updateSubmit" element
    And I wait for ladda animation to complete
    And I wait for animations to finish
    Then I should see "Please select a file to upload"
    And I should see "Please enter a title for the journal update"
    And I should see "Please enter a description for the journal update"

    # Word Count Type Selected
    When I click on the ".radio[value='word_count']" element
    And I fill in "update_title" with ""
    And I fill in "update_description" with ""
    Then I click on the "#updateSubmit" element
    And I wait for ladda animation to complete
    And I wait for animations to finish
    Then I should see "Please enter a title for the journal update"
    And I should see "Please enter a description for the journal update"
    And I should see "Please enter the amount of pages your novel has as of this update"
    And I should see "Please enter the amount of words your novel has as of this update"
    And I should see "Please enter the amount of characters your novel has as of this update"
    And I should see "Please enter the amount of characters not including spaces your novel has as of this update"

  @javascript @journal_entry @test
  Scenario: Add a Image Journal Entry to a Project
    Given I am logged in
    And I wait 1 second
    When I click on the '.grid_item[data-id="2"]' element
    And I wait 1 second
    Then I click on the "#project_info_add_entry_button" element
    And I wait for animations to finish
    Then I should see "Write Project Update" in the ".overlay_panel.add_update h2" element
    When I select "image" from "update_type"
    When I attach the file "image_journal_entry.jpg" to "entry_file"
    When I fill in "update_title" with "Behat Image Journal Entry Test Title"
    And I fill in "update_description" with "Behat image journal entry description"
    Then I click on the "#updateSubmit" element
    And I wait for ladda animation to complete
    Then I should see "Journal Entry Added Successfully"

    When I click on the ".overlay_panel.add_update .close_x" element
    And I wait for animations to finish

    Then I click on the "#updates_open_close" element
    And I wait 1 second
    Then I should see an "img.image" element
    And "img.image" element should have an "title" attribute with "Behat Image Journal Entry Test Title" value

  @javascript @journal_entry
  Scenario: Add a Audio Journal Entry to a Project
    Given I am logged in
    And I wait 1 second
    When I click on the '.grid_item[data-id="2"]' element
    And I wait 1 second
    Then I click on the "#project_info_add_entry_button" element
    And I wait for animations to finish
    When I select "audio" from "update_type"
    When I attach the file "audio_journal_entry.mp3" to "entry_file"
    When I fill in "update_title" with "Behat Audio Journal Entry Test Title"
    And I fill in "update_description" with "Behat audio journal entry description"
    Then I click on the "#updateSubmit" element
    And I wait for ladda animation to complete
    Then I should see "Journal Entry Added Successfully"

    When I click on the ".overlay_panel.add_update .close_x" element
    And I wait for animations to finish

    Then I click on the "#updates_open_close" element
    And I wait 1 second
    Then I should see an "div.audio" element
    And I should see an "audio" element

  @javascript @journal_entry
  Scenario: Add a Word Count Journal Entry to a Project
    Given I am logged in
    And I wait 1 second
    When I click on the '.grid_item[data-id="2"]' element
    And I wait 1 second
    Then I click on the "#project_info_add_entry_button" element
    And I wait for animations to finish
    When I select "word_count" from "update_type"
    When I fill in "update_title" with "Behat Word Count Journal Entry Test Title"
    And I fill in "update_description" with "Behat word count journal entry description"
    And I fill in "word_count_pages" with "10"
    And I fill in "word_count_words" with "12345"
    And I fill in "word_count_characters" with "456789"
    And I fill in "word_count_characters_excluding_spaces" with "456123"
    Then I click on the "#updateSubmit" element
    And I wait for ladda animation to complete
    Then I should see "Journal Entry Added Successfully"

    When I click on the ".overlay_panel.add_update .close_x" element
    And I wait for animations to finish

    Then I click on the "#updates_open_close" element
    And I wait 1 second
    Then I should see an "div.wc" element
    And I should see "12345" in the "div.wc span" element







