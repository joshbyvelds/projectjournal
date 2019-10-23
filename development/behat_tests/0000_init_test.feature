Feature: Behat Mink Setup Test
  In order to make sure Behat test are running correctly, run this test
  Be sure to have selenium server running.
  C:\Java Jars>java -jar selenium-server-standalone-3.141.59.jar

  @javascript @init
  Scenario: Test Behat and Mink are working on browser..
    When I start running behat tests
    Given I am on "/"
    Then I should see a "body" element
    And I should see "Copyright 2019" appear

