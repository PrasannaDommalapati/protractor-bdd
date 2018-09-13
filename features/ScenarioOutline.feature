Feature: To search keywords in google

  @Smoke
  Scenario Outline: Searching on google

    Given I am on "<search>" search page
    When  I search for "<search keyword>"
    Then  I should see page title as "<search keyword>"

    Examples:
      | search     | search keyword |
      | google     | cucumber       |
      | cucumber   | protractor1     |
      | protractor | typescript1     |
  