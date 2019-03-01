<?php

namespace ProjectJournal\Modal;

class TwigArray
{
    private $type = 'twig';
    private $file;
    private $variables;

    public function __construct(string $file, array $variables)
    {
        $this->file = $file;
        $this->variables = $variables;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getFile(): string
    {
        return $this->file;
    }

    public function getVariables(): array
    {
        return $this->variables;
    }
}
