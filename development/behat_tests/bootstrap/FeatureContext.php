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
     * @When /^I start running behat tests$/
     */
    public function startBehatTests(){
        $files = glob(getCWD() . '/development/behat_tests/screenshots/*'); // get all file names
        foreach($files as $file){ // iterate files
            if(is_file($file))
                unlink($file); // delete file
        }
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

    /** Look for attribute in selector
     *
     * @Then :selector element should have an :attr attribute
     */
    public function elementHasAttribute($selector, $attr)
    {
        $element = $this->getSession()->getPage()->find('css', $selector);

        if (null === $element) {
            throw new \InvalidArgumentException(sprintf('Could not evaluate XPath: "%s"', $selector));
        }

        if (!$element->hasAttribute($attr)) {
            throw new \InvalidArgumentException(sprintf('"%s" does not have a "%s"', $selector, $attr));
        }
    }

    /** Look for attribute in selector and see it has certain value
     *
     * @Then :selector element should have an :attr attribute with :value value
     */
    public function elementHasAttributeWithValue($selector, $attr, $value)
    {
        $element = $this->getSession()->getPage()->find('css', $selector);

        if (null === $element) {
            throw new \InvalidArgumentException(sprintf('Could not evaluate XPath: "%s"', $selector));
        }

        if (!$element->hasAttribute($attr)) {
            throw new \InvalidArgumentException(sprintf('"%s" does not have a "%s"', $selector, $attr));
        }

        $act_value = $element->getAttribute($attr);

        if ($act_value !== $value) {
            throw new \InvalidArgumentException(sprintf('"%s" in "%s" does not equal "%s". it current equals "%s"', $selector, $attr, $value, $act_value));
        }
    }

    /** Click on the element with the provided selector
     *
     * @Then I click on the :selector element
     */
    public function iClickOnTheElementSelector($selector)
    {
        $element = $this->getSession()->getPage()->find('css', $selector);

        if (null === $element) {
            throw new \InvalidArgumentException(sprintf('Could not evaluate XPath: "%s"', $selector));
        }

        $element->click();
    }

    /**
     * @Given I am not logged in
     */
    public function iAmNotLoggedIn()
    {
        $this->getSession()->restart();
    }

    /**
     * @Given I am logged in
     */
    public function iAmLoggedInAsAUserWithPassword()
    {
        $this->getSession()->setCookie('behat', true);
        $this->visitPath("/");
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
     * @When I wait for ajax to finish
     */
    public function iWaitForAjax()
    {
        return $this->getSession()->wait(10000, '(typeof(jQuery)=="undefined" || (0 === jQuery.active && 0 === jQuery(\':animated\').length))');
    }

    /**
     * @When I wait for slow animations to finish
     */
    public function iWaitForSlowAnimationsToFinish()
    {
        $contiguousInvocations = 0;
        $this->spin(function ($context) use (&$contiguousInvocations) {
            /** @var MinkContext $context */
            if (!$context->getSession()->getPage()->find('css', '.velocity-animating')) {
                $contiguousInvocations++;
            }

            return $contiguousInvocations > 5;
        });
    }

    /**
     * @When I wait for ladda animation to complete
     */
    public function iWaitForLaddaAnimationsToFinish()
    {
        $contiguousInvocations = 0;
        $this->uspin(function ($context) use (&$contiguousInvocations) {
            /** @var MinkContext $context */

            if (!$context->getSession()->getPage()->find('css', '.ladda-button')->hasAttribute("data-loading")) {
                $contiguousInvocations++;
            }

            return $contiguousInvocations > 5;
        });
    }

    /**
     * @When I wait for animations to finish
     */
    public function iWaitForAnimationsToFinish()
    {
        $contiguousInvocations = 0;
        $this->uspin(function ($context) use (&$contiguousInvocations) {
            /** @var MinkContext $context */
            if (!$context->getSession()->getPage()->find('css', '.velocity-animating')) {
                $contiguousInvocations++;
            }

            return $contiguousInvocations > 5;
        });
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

    public function uSpin($lambda, $waitCycles = 250)
    {
        for ($i = 0; $i < $waitCycles; $i++) {
            try {
                if ($lambda($this)) {
                    return true;
                }
            } catch (Exception $e) {
            }
            usleep(50000);
        }
        $backtrace = debug_backtrace();

        throw new Exception(
            "Timeout thrown by " . $backtrace[1]['class'] . "::" . $backtrace[1]['function'] . "()\n" .
            ", type " . $backtrace[1]['type']
        );
    }
}
