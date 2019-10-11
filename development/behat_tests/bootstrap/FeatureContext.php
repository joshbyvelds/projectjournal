<?php

use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;
use Behat\MinkExtension\Context\MinkContext;


/**
 * Defines application features from the specific context.
 */
class FeatureContext extends MinkContext implements Context
{
    /**
     * Initializes context.
     *
     * Every scenario gets its own context instance.
     * You can also pass arbitrary arguments to the
     * context constructor through behat.yml.
     */
    public function __construct()
    {

    }

    /**
     * @Then /^I reset the database config$/
     */
    public function resetDBConfig()
    {
        $db = new PDO("mysql:dbname=project_journal_behat;host=localhost", "behat", "behat");
        $db->exec("DROP DATABASE `project_journal_behat`;");

        if(unlink(getCWD() . "/production/php/ProjectJournal/Config/database.config.php")) {
            copy(getCWD() . "/production/php/ProjectJournal/Config/database.config.php.bck", getCWD() . "/production/php/ProjectJournal/Config/database.config.php");
            unlink(getCWD() . "/production/php/ProjectJournal/Config/database.config.php.bck");
        }

    }

    /**
     * @When /^I wait (\d*) seconds?$/
     */
    public function iWait($sec)
    {
        for ($i = 0; $i < $sec; $i++) {
            sleep(1);
        }
    }

    /**
     * Check an element for a specific string
     *
     * @Then I should see the text in :selector is :text
     */
    public function iSeeSelectorHasText($selector, $text)
    {
        $elementText = $this->getSession()->getPage()->find('css', $selector)->getText();

        if ($elementText !== $text) {
            throw new \Exception(sprintf('Selector does not contain: "%s". It\'s text is "%s"', $text, $elementText));
        }

        if (null === $elementText) {
            throw new \InvalidArgumentException(sprintf('Could not evaluate CSS Selector: "%s"', $selector));
        }
    }

    /**
     * @When I wait for :text to appear
     * @Then I should see :text appear
     * @param $text
     * @throws \Exception
     */
    public function iWaitForTextToAppear($text)
    {
        $this->spin(function(FeatureContext $context) use ($text) {
            try {
                $context->assertPageContainsText($text);
                return true;
            }
            catch(ResponseTextException $e) {
                // NOOP
            }
            return false;
        });
    }
    public function spin ($lambda, $wait = 60)
    {
        for ($i = 0; $i < $wait; $i++)
        {
            try {
                if ($lambda($this)) {
                    return true;
                }
            } catch (Exception $e) {
                // do nothing
            }
            sleep(1);
        }
        $backtrace = debug_backtrace();
        throw new Exception(
            "Timeout thrown by " . $backtrace[1]['class'] . "::" . $backtrace[1]['function'] . "()\n" .
            $backtrace[1]['file'] . ", line " . $backtrace[1]['line']
        );
    }
}
