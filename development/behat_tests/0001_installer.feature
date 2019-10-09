Feature: DB and App Installer

  @javascript
  Scenario: Check for Empty Field Errors
    Given I am on "/"
    And I press "installSubmit"
    Then I should see "Please enter the name of the host you will be using."
    Then I should see "Please enter the name of the database you will be using."
    Then I should see "Please enter the user name for database."
    Then I should see "Please enter the password for the username above."
    Then I should see "Please create a user name for the admin account."
    Then I should see "Please create a password for the admin account."

  @javascript
  Scenario: Check for Empty Field Errors
    Given I am on "/"
    When I fill in "database_host" with "localhost"
    When I fill in "database_name" with "project_journal_behat"
    When I fill in "database_user" with "behat"
    When I fill in "database_password" with "behat"
    Then I check "create_database"
    When I fill in "admin_username" with "behat"
    When I fill in "admin_password" with "behatpassword"
    And I press "installSubmit"
    And I wait 3 seconds
    Then I should be on "/login"
