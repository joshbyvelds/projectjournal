Feature: Login Page / Form

  @javascript
  Scenario: Check for Empty Field Errors
    Given I am on "/"
    And I press "loginSubmit"
    Then I wait for ladda animation to complete
    Then I wait for animations to finish
    Then I should see "Please enter the username for account."
    Then I should see "Please enter the password for your account."

  @javascript
  Scenario: Login to site with incorrect username
    Given I am on "/"
    When I fill in "username" with "wrongusername"
    When I fill in "password" with "behatpassword"
    And I press "loginSubmit"
    Then I wait for ladda animation to complete
    Then I wait for animations to finish
    Then I should see "Username and password do not match. Try again."

  @javascript
  Scenario: Login to site with incorrect password
    Given I am on "/"
    When I fill in "username" with "behat"
    When I fill in "password" with "behatpasswordwrong"
    And I press "loginSubmit"
    Then I wait for ladda animation to complete
    Then I wait for animations to finish
    Then I should see "Username and password do not match. Try again."

  @javascript
  Scenario: Login to site with incorrect username & password
    Given I am on "/"
    When I fill in "username" with "wrongusername"
    When I fill in "password" with "behatpasswordwrong"
    And I press "loginSubmit"
    Then I wait for ladda animation to complete
    Then I wait for animations to finish
    Then I should see "Username and password do not match. Try again."

  @javascript
  Scenario: Login to site with correct username and password
    Given I am on "/"
    When I fill in "username" with "behat"
    When I fill in "password" with "behatpassword"
    And I press "loginSubmit"
    Then I wait for ladda animation to complete
    Then I wait for animations to finish
    Then I wait 1 seconds
    Then I should be on "/"
