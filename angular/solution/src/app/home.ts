import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXERCISES, ExerciseMeta } from './exercises.catalog';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <h2>Esercizi Angular</h2>
    <p class="hint">9 esercizi su 3 livelli. Clicca per aprire l'esercizio.</p>

    @for (level of [1, 2, 3]; track level) {
      <section class="level">
        <h3>Livello {{ level }}</h3>
        <div class="grid">
          @for (ex of byLevel(level); track ex.id) {
            <a class="card tile" [routerLink]="ex.path">
              <span class="badge">{{ ex.id }}</span>
              <strong>{{ ex.title }}</strong>
              <span class="hint">{{ ex.topic }}</span>
            </a>
          }
        </div>
      </section>
    }
  `,
  styles: [
    `
      .level {
        margin-bottom: 1.75rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 1rem;
      }
      .tile {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        text-decoration: none;
        color: inherit;
        transition: box-shadow 0.15s ease;
      }
      .tile:hover {
        box-shadow: 0 4px 14px rgba(31, 42, 68, 0.15);
      }
      .badge {
        align-self: flex-start;
        background: #eef1f6;
        color: #1f2a44;
        border-radius: 999px;
        padding: 0.1rem 0.6rem;
        font-size: 0.75rem;
        font-weight: 600;
      }
    `,
  ],
})
export class Home {
  byLevel(level: number): ExerciseMeta[] {
    return EXERCISES.filter((e) => e.level === level);
  }
}
