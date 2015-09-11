var depth = -1;

function in(content_name, content) {
  depth += 1;
  console.log(depth, ':', content_name, content);
}

function out(content_name, content) {
  depth -= 1;
  console.log(depth, ':', content_name, content);
}
