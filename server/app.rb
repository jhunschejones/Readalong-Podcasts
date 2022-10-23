require "rubygems"
require "sinatra"

set :public_folder, File.expand_path("..", __dir__)

get "/" do
  redirect to("/index.html")
end
