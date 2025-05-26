import json
import os
from collections import defaultdict

def analyze_build_stats():
    file_path = 'build-stats.json'
    
    print("Starting analysis of build-stats.json...")
    print(f"File size: {os.path.getsize(file_path) / (1024*1024):.2f} MB")
    
    try:
        print("Loading JSON file...")
        with open(file_path, 'r', encoding='utf-8') as f:
            stats = json.load(f)
        
        print("\n=== WEBPACK BUILD STATS ANALYSIS ===\n")
        
        # Basic info
        print(f"Webpack Version: {stats.get('version', 'Unknown')}")
        print(f"Build Time: {stats.get('time', 'Unknown')} ms")
        if 'builtAt' in stats:
            from datetime import datetime
            built_at = datetime.fromtimestamp(stats['builtAt'] / 1000)
            print(f"Built At: {built_at.isoformat()}")
        
        # Assets analysis
        if 'assets' in stats and isinstance(stats['assets'], list):
            print(f"\n=== ASSETS ANALYSIS ===")
            print(f"Total Assets: {len(stats['assets'])}")
            
            # Sort by size
            assets_with_size = [asset for asset in stats['assets'] if 'size' in asset]
            sorted_assets = sorted(assets_with_size, key=lambda x: x['size'], reverse=True)[:20]
            
            print(f"\nTop 20 Largest Assets:")
            for i, asset in enumerate(sorted_assets, 1):
                size_kb = asset['size'] / 1024
                size_mb = size_kb / 1024
                size_display = f"{size_mb:.2f}MB" if size_mb > 1 else f"{size_kb:.2f}KB"
                print(f"{i}. {asset['name']} - {size_display}")
            
            # Total bundle size
            total_size = sum(asset.get('size', 0) for asset in stats['assets'])
            total_size_mb = total_size / (1024 * 1024)
            print(f"\nTotal Bundle Size: {total_size_mb:.2f}MB")
        
        # Modules analysis
        if 'modules' in stats and isinstance(stats['modules'], list):
            print(f"\n=== MODULES ANALYSIS ===")
            print(f"Total Modules: {len(stats['modules'])}")
            
            # Sort modules by size
            modules_with_size = [module for module in stats['modules'] if 'size' in module]
            sorted_modules = sorted(modules_with_size, key=lambda x: x['size'], reverse=True)[:20]
            
            print(f"\nTop 20 Largest Modules:")
            for i, module in enumerate(sorted_modules, 1):
                size_kb = module['size'] / 1024
                name = module.get('name') or module.get('identifier', 'Unknown module')
                # Truncate long names
                display_name = name[:80] + '...' if len(name) > 80 else name
                print(f"{i}. {display_name} - {size_kb:.2f}KB")
            
            # NPM packages analysis
            package_sizes = defaultdict(int)
            for module in stats['modules']:
                name = module.get('name') or module.get('identifier', '')
                if 'node_modules' in name:
                    # Extract package name
                    parts = name.split('node_modules/')
                    if len(parts) > 1:
                        package_part = parts[-1].split('/')[0]
                        if package_part.startswith('@'):
                            # Scoped package
                            package_parts = parts[-1].split('/')[:2]
                            package_name = '/'.join(package_parts)
                        else:
                            package_name = package_part
                        package_sizes[package_name] += module.get('size', 0)
            
            if package_sizes:
                top_packages = sorted(package_sizes.items(), key=lambda x: x[1], reverse=True)[:15]
                print(f"\nTop 15 Largest NPM Packages:")
                for i, (package_name, size) in enumerate(top_packages, 1):
                    size_kb = size / 1024
                    size_mb = size_kb / 1024
                    size_display = f"{size_mb:.2f}MB" if size_mb > 1 else f"{size_kb:.2f}KB"
                    print(f"{i}. {package_name} - {size_display}")
        
        # Chunks analysis
        if 'chunks' in stats and isinstance(stats['chunks'], list):
            print(f"\n=== CHUNKS ANALYSIS ===")
            print(f"Total Chunks: {len(stats['chunks'])}")
            
            chunks_with_size = [chunk for chunk in stats['chunks'] if 'size' in chunk]
            sorted_chunks = sorted(chunks_with_size, key=lambda x: x['size'], reverse=True)[:10]
            
            print(f"\nTop 10 Largest Chunks:")
            for i, chunk in enumerate(sorted_chunks, 1):
                size_kb = chunk['size'] / 1024
                size_mb = size_kb / 1024
                size_display = f"{size_mb:.2f}MB" if size_mb > 1 else f"{size_kb:.2f}KB"
                names = ', '.join(chunk.get('names', [])) if chunk.get('names') else f"Chunk {chunk.get('id', 'Unknown')}"
                print(f"{i}. {names} - {size_display}")
        
        # Build status
        print(f"\n=== BUILD STATUS ===")
        print(f"Errors: {stats.get('errorsCount', 0)}")
        print(f"Warnings: {stats.get('warningsCount', 0)}")
        
        if stats.get('errors') and len(stats['errors']) > 0:
            print(f"\nFirst 3 Errors:")
            for i, error in enumerate(stats['errors'][:3], 1):
                print(f"{i}. {str(error)[:200]}...")
        
        if stats.get('warnings') and len(stats['warnings']) > 0:
            print(f"\nFirst 3 Warnings:")
            for i, warning in enumerate(stats['warnings'][:3], 1):
                print(f"{i}. {str(warning)[:200]}...")
        
        print(f"\n=== OPTIMIZATION RECOMMENDATIONS ===")
        print("1. Check the largest assets and modules above for optimization opportunities")
        print("2. Consider code splitting for large chunks")
        print("3. Review NPM packages - consider lighter alternatives for the largest ones")
        print("4. Use webpack-bundle-analyzer for visual analysis")
        print("5. Consider dynamic imports for non-critical modules")
        print("6. Enable tree shaking for unused code elimination")
        print("7. Consider using Module Federation for microfrontend optimization")
        
    except Exception as e:
        print(f"Error analyzing build stats: {str(e)}")
        if 'JSON' in str(e):
            print("The file might be corrupted or not valid JSON")

if __name__ == "__main__":
    analyze_build_stats()
