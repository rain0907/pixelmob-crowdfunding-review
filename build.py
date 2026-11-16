from pathlib import Path
import re
ROOT=Path(__file__).resolve().parent
head=(ROOT/"index.html").read_text(encoding="utf-8")
# index.html is the deployable built artifact; reconstruct from editable sections and assets.
old=(ROOT/"_archive_before_20261116/index.html").read_text(encoding="utf-8")
headpart=old[:old.index("<body>")+len("<body>")]
css=(ROOT/"assets/styles.css").read_text(encoding="utf-8")
headpart=re.sub(r"<style>.*?</style>", "", headpart, flags=re.S)
headpart=headpart.replace("</head>", "<style>\\n"+css+"\\n</style>\\n</head>")
sections=["00_shell.html","01_sales.html","02_channels.html","03_close_retail_appendix.html"]
body="\n".join((ROOT/"sections"/n).read_text(encoding="utf-8") for n in sections)
body=body.replace("</main>", "</main>\n<script src=\"assets/app.js\"></script>",1)
js=(ROOT/"assets/app.js").read_text(encoding="utf-8")
(ROOT/"index.html").write_text(headpart+"\n"+body+"\n</body>\n</html>\n",encoding="utf-8")
print("built",ROOT/"index.html")
