set /a total_files=0
set /a css_files=0
set /a module_files=0
cd scss
for %%f in (*.scss) do (
  set /a total_files+=1
  sass %%f ../css/%%~nf.css
  if exist ../css/%%~nf.css (
    set /a css_files+=1
  )
  sass %%f ../module.css/%%~nf.module.css
  if exist ../module.css/%%~nf.module.css (
    set /a module_files+=1
  )
)

cd ..
if %css_files%==%total_files% (
  echo Success: All %css_files% CSS files generated.
) else (
  set /a not_css_files=total_files-css_files
  echo Error: %css_files% CSS files generated, %not_css_files% files not generated.
)
cd ..
if %module_files%==%total_files% (
  echo Success: All %module_files% CSS files generated.
) else (
  set /a not_module_files=total_files-module_files
  echo Error: %module_files% module files generated, %not_module_files% files not generated.
)
cd ..
pause
