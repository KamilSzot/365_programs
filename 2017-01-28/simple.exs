defmodule Simple do
    def glue(words) do
        Enum.join(words, " ")
    end 
    def run do
        IO.puts glue(["Happy", "new", "year"])    
    end
end

Simple.run
