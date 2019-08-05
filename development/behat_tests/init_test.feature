Feature: Behat Mink Setup Test
  In order to make sure Behat test are running correctly, run this test
  Be sure to have selenium server running.
  C:\Java Jars>java -jar selenium-server-standalone-3.141.59.jar

  @javascript
  Scenario: Search for a word that exists
    Given I am on "/"
    When I wait for "Samsung Galaxy S II" to appear
    When I fill in "searchTerm" with "Samsung"
    And I press "search_submit"
    Then I should see "Samsung Galaxy S II"

