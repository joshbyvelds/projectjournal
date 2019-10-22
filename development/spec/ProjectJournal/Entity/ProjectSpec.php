<?php

namespace spec\ProjectJournal\Controller;

use ProjectJournal\Entity\Project;
use PhpSpec\ObjectBehavior;

class ProjectSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(Project::class);
    }
}