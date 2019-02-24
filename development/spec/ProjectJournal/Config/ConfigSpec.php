<?php

namespace spec\ProjectJournal\Config;

use ProjectJournal\Config\Config;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class ConfigSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(Config::class);
    }
}
