import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode, assertPlatform } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
